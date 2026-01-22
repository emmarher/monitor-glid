// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{Emitter, Runtime};
use tokio_tungstenite::connect_async;
use futures_util::StreamExt;

use tokio::sync::Mutex;
use futures_util::SinkExt; // Necesario para .send()

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn start_wifi_session<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    //let url = "ws://192.168.4.1/ws";
    let url = "ws://echo.websocket.org";
    // Spawneamos una tarea asíncrona en el runtime de Tokio
    tauri::async_runtime::spawn(async move {
        match connect_async(url).await {
            Ok((ws_stream, _)) => {
                let (_, mut read) = ws_stream.split();
                
                // Notificar al Frontend que estamos conectados
                let _ = window.emit("connection-status", "CONNECTED");

                while let Some(msg) = read.next().await {
                    if let Ok(message) = msg {
                        if message.is_text() || message.is_binary() {
                            let text = message.to_text().unwrap_or("Data error");
                            // Enviamos la trama cruda al TerminalFooter o al Home
                            let _ = window.emit("raw-data", text);
                        }
                    }
                }
                let _ = window.emit("connection-status", "DISCONNECTED");
            }
            Err(e) => {
                let _ = window.emit("connection-status", format!("ERROR: {}", e));
            }
        }
    });

    Ok(())
}

// Estructura para guardar el canal de escritura del socket
struct WsState(Mutex<Option<futures_util::stream::SplitSink<tokio_tungstenite::WebSocketStream<tokio_tungstenite::MaybeTlsStream<tokio::net::TcpStream>>, tokio_tungstenite::tungstenite::Message>>>);

#[tauri::command]
async fn send_command(state: tauri::State<'_, WsState>, cmd: String) -> Result<(), String> {
    let mut connector = state.0.lock().await;
    if let Some(ref mut sink) = *connector {
        sink.send(tokio_tungstenite::tungstenite::Message::Text(cmd.into()))
            .await
            .map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("No hay conexión activa".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, start_wifi_session, send_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
