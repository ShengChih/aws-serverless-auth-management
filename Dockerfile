FROM ubuntu:latest
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apt-get update -qq && \
    apt-get install -y locales \
    software-properties-common \
    language-pack-en \
    build-essential \
    curl \
    sudo \
    vim \
    zip \
    unzip \
    net-tools \
    ncdu \
    git \
    git-flow \
    tmux \
    ca-certificates \
    gnupg \
    lsb-release \
    zsh
# install docker
RUN sudo mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get -y update && apt-get -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# relpace python3.10 to python3.8
RUN add-apt-repository ppa:deadsnakes/ppa -y && \
    apt autoremove -y python3 && \
    apt update -y && \
    apt-get -y install python3.8 python3.8-distutils  && \
    ln -s /usr/bin/python3.8 /usr/bin/python3 && \
    ln -s /usr/bin/python3.8 /usr/bin/python && \
    curl -o- "https://bootstrap.pypa.io/get-pip.py" | python3.8 - && \
    pip3 install --upgrade pip && \
    pip3 --no-cache-dir install --upgrade awscli
# create user & password
RUN useradd -ms /bin/bash ec2-user && \
    sudo usermod -aG sudo,root ec2-user && \
    sudo usermod -aG docker ec2-user && \
    echo "root:`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`" > /home/ec2-user/root_passwd && \
    cat /home/ec2-user/root_passwd | chpasswd && \
    echo "ec2-user:`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`" > /home/ec2-user/ec2-user_passwd && \
    echo "ec2-user  ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers
USER ec2-user
ENV TZ=Asia/Taipei \
    HOME=/home/ec2-user \
    NVM_DIR=/home/ec2-user/.nvm
RUN mkdir -p /home/ec2-user/aws_serverless_auth_management
WORKDIR /home/ec2-user/aws_serverless_auth_management
ARG NVM_VER=0.39.1
ARG NPM_VER=8.15.0
ARG NODE_VER=16.17.0
ARG PNPM_VERSION=7.9.5
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3 - && \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    sed 's/ec2-user://g' /home/ec2-user/ec2-user_passwd | sudo chsh -s $(which zsh) && \
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VER/install.sh" | bash && \
    chmod +x ~/.nvm/nvm.sh && \
    . $NVM_DIR/nvm.sh && \
    nvm install --lts && \
    nvm use --lts && \
    curl -fsSL https://get.pnpm.io/install.sh | SHELL=`which zsh` PNPM_VERSION=$PNPM_VERSION zsh -
ENV PATH=$PATH:/home/ec2-user/.nvm/versions/node/v$NODE_VER/bin:/home/ec2-user/.local/share/pnpm/:/home/ec2-user/aws_serverless_auth_management/node_modules/.bin:/home/ec2-user/.poetry/bin:/home/ec2-user/.local/bin
CMD ["/usr/bin/zsh"]