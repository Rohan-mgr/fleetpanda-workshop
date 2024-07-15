#!/bin/bash

echo "Enter your age:"
read age

eligible=$(
	if [ $age -lt 0 ]; then
		echo "Invalid age";
	elif [ $age -ge 18 ]; then
		echo "eligible"
	else 
	echo "not_eligible"
	fi
)

case $eligible in 
	"eligible")
	echo "You are eligible to vote"
	;;
	"not_eligible")
	echo "You are not eligible to vote"
	;;
	*)
	echo "Invalid age"
	;;
esac
