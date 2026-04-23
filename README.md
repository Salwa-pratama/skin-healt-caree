# Build image front end dan backend

```
shell
podman build -t frontend-image .
podman build -t backend-image .
```

# Aturan seblum melakukan pengembangan

1. Pastikan sudah pull local versi terbaru dari branch, development, main, maupun production
2. Membuat branch dengan nama yang sesuai dengan fitur yang akan dikembangkan
   - frontend-feature/login-page
   - backend-feature/login-api
3. Setelah sudah melakukan pengembangan lakukan push branch yang telah dibuat ke gitlab
4. Lakukan merge request dan tunggu hasil review dari reviewer atau project manajer
