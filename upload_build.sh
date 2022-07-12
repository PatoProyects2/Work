#!/bin/bash
# -*- ENCODING: UTF-8 -*-
export NODE_OPTIONS="--max-old-space-size=20192"
aws s3 sync build/ s3://gamesclubtest --acl public-read
exit