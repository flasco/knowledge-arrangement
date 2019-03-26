# docker 常用指令记录

- build: `docker build -t <image_name> .`
- run: `docker run --cpus=1 -v $PWD/fetched:/data <image_name>`
- 停止所有正在运行的 docker: `docker kill $(docker container ls -q)`
- 停止指定容器: `docker kill <docker_id>`

- 查看所有 images: `docker images`
- 删除指定镜像: `docker image rm <image_id>`

- 查看运行的 docker: `docker ps`
- 清理临时镜像: `docker image prune`
- 查看实时 docker 日志: `docker logs -f <docker_id>`
- 查看 docker 倒数 x 条日志:`docker logs --tail=x <docker_id>`
- 查看 docker 倒数 x 条日志，带时间戳:`docker logs --tail=x -t <docker_id>`
- 暂停指定容器: `docker pause [OPTIONS] CONTAINER [CONTAINER...]`
- 恢复指定容器: `docker unpause [OPTIONS] CONTAINER [CONTAINER...]`

- 查看当前的所有容器: `docker ps -a`
- 删除指定容器: `docker rm [container ids...]`
- 清理所有已经暂停的容器: `docker container prune`