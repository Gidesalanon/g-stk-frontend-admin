apt-get update -qq && apt-get install -yqq nodejs
apt-get install git openssh-client -y
mkdir -p ~/.ssh && echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa
ssh-keyscan -p ${DOKKU_PORT:-22} -H "$DOKKU_HOST" >> ~/.ssh/known_hosts
git push ssh://dokku@$DOKKU_HOST:${DOKKU_PORT:-22}/$DOKKU_PROJECT_NAME $DRONE_BRANCH:master
