#!/bin/bash
word='display'
fileNames=$(find .|grep -E '\.js|\.css|\.html')
for i in $fileNames; do
	if [[ ! $i =~ "oldcode" ]] ; then
		if [[ ! $i =~ "study" ]] ; then
			if [[ ! $i =~ "lib" ]] ; then
				echo $i
				cat $i|grep $word
			fi
		fi
	fi
done
echo $sum
