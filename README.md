<!-- Build image front end dan backend -->

```
shell
podman build -t frontend-image .
podman build -t backend-image .
```

<!-- Sedikit alur cerita proses fetch api -->

Frontend
↓
Express (backend utama)
↓
Flask (ML service)
↓
Express
↓
Database
↓
Express
↓
Frontend
