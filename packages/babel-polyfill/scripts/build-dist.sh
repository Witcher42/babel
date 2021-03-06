#!/bin/sh
set -ex

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"

mkdir -p dist

node $BROWSERIFY_CMD lib/index.js \
  --insert-global-vars 'global' \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  >dist/polyfill.js
node $UGLIFY_CMD dist/polyfill.js \
  --compress warnings=false \
  --mangle \
  >dist/polyfill.min.js
