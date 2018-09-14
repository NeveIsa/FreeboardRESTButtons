#!/bin/bash

if [ -z $1 ]
then
comment="auto commit by $USER"
else
comment=$1
fi

echo $comment


git add .
git commit -m "$comment"
git push
