#!/bin/bash
fileNames=$(find .|grep -E '\.js|\.css|\.html')
sum=0;
for i in $fileNames; do
	if [[ ! $i =~ "oldcode" ]] ; then
		if [[ ! $i =~ "study" ]] ; then
			if [[ ! $i =~ "lib" ]] ; then
				if [[ ! $i =~ "frameworks" ]] ; then
					if [[ ! $i =~ "cocos2d-js" ]] ; then
						echo $i
						oneCount=$(wc $i|awk '{print $1}')
						sum=$((10#$sum+10#$oneCount))
					fi
				fi
			fi
		fi
	fi
done
echo $sum
