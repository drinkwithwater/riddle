#!/bin/bash
fileNames=$(find .|grep .js)
sum=0;
for i in $fileNames; do
	if [[ ! $i =~ "oldcode" ]] ; then
		if [[ ! $i =~ "study" ]] ; then
			if [[ ! $i =~ "lib" ]] ; then
				echo $i
				oneCount=$(wc $i|awk '{print $1}')
				sum=$((10#$sum+10#$oneCount))
			fi
		fi
	fi
done
echo $sum
