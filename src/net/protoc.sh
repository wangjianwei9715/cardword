echo "generate bundle.js"
pbjs -t static-module -w commonjs -o proto.js *.proto && pbts -o proto.d.ts proto.js
echo "done"