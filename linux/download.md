# linux 下载、上传远程文件

## 使用 scp 上传下载

scp 下载整个文件 (或者文件夹，都行) 到本地
`scp -r [root]@[ip]:[远程目录] [本地目录]`

scp 上传到远程
`scp -r [本地目录] [root]@[ip]:[远程目录]`

## 使用 rz sz 上传下载

首先需要在远程安装 `lrzsz`

```bash
yum install lrzsz -y
```

等本地配置好之后

- 上传: 在远程服务器输入 `rz` 回车，选择文件即可
- 下载: 在远程服务器输入 `sz [fileName1 2 3...]`

下面是具体的本地配置，区分系统

### mac

1. 安装 iTerm2 - http://www.iterm2.com/#/section/downloads
2. 用 brew 安装 lrzsz

```bash
sudo brew install lrzsz
ln -s /usr/local/Cellar/lrzsz/0.12.20/bin/sz
ln -s /usr/local/Cellar/lrzsz/0.12.20/bin/rz
```

3. 用 wget 安装 iTerm 插件, 如果没有 wget 的话用 brew 装一个

```bash
cd /usr/local/bin
sudo wget https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh
sudo wget https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh
sudo chmod 777 /usr/local/bin/iterm2-*
```

4. 手动给 iTerm2 添加 trigger

iTerm2 --> Profiles --> Open Profiles --> Edit Profiles --> Advanced --> Edit Trigger

配置项：(注意星号之前的反斜杠)

| Regular expression         | 　　 Action                 | 　　　　　　　 Parameters                |
| -------------------------- | --------------------------- | ---------------------------------------- |
| \\\*\\\*B0100 　　　　　   | 　　　 Run Silent Coprocess | 　　/usr/local/bin/iterm2-send-zmodem.sh |
| \\\*\\\*B00000000000000 　 | Run Silent Coprocess        | 　　/usr/local/bin/iterm2-recv-zmodem.sh |
