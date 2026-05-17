// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg(target_os = "linux")]
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(target_os = "linux")]
            if let Some(main_window) = app.get_webview_window("main") {
                main_window.with_webview(|webview| {
                    use webkit2gtk::glib::prelude::ObjectExt;
                    use webkit2gtk::{
                        PermissionRequestExt, UserMediaPermissionRequest, WebViewExt,
                    };

                    webview.inner().connect_permission_request(|_, request| {
                        if request.is::<UserMediaPermissionRequest>() {
                            request.allow();
                            return true;
                        }

                        false
                    });
                })?;
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
