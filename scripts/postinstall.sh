#!/bin/bash

folders=(
  "./node_modules/react-native-math/react-native-math-expo"
  "./node_modules/react-native-math/node_modules"
)

for folder in "${folders[@]}"; do
  if [ -d "$folder" ]; then
    echo "Removing $folder"
    rm -rf "$folder"
  else
    echo "Folder $folder does not exist, skipping"
  fi
done

echo "Post-install completed."
exit 0