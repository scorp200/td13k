java -jar closure-compiler/closure-compiler-v20180805.jar \
--compilation_level ADVANCED_OPTIMIZATIONS \
--language_in=ES5_STRICT \
--output_wrapper_file src/build_index.html \
--js_output_file build/compiled.html \
--assume_function_wrapper \
src/constants.js \
src/utils.js \
src/speech.js \
src/lib/player-small.js \
src/data/song.js \
src/data/song2.js \
src/data/sfx_click.js \
src/data/sprite_satellite.js \
src/data/sprEnemyShip.js \
src/WaveManager.js \
src/music.js \
src/mouse.js \
src/base.js \
src/gui.js \
src/buttons.js \
src/view.js \
src/graphics.js \
src/starscape.js \
src/orbital.js \
src/Laser.js \
src/enemy.js \
src/loadingscreen.js \
src/game.js
