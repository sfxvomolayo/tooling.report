/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { src, dest, series } = require('gulp');
const RevAll = require('gulp-rev-all');

function hashAssets() {
  return src('src/**')
    .pipe(
      RevAll.revision({
        includeFilesInManifest: ['.js', '.css', '.png'],
      }),
    )
    .pipe(dest('build/'))
    .pipe(RevAll.manifestFile())
    .pipe(dest('build/'));
}

function log(cb) {
  const manifest = require('./build/rev-manifest.json');
  console.log(Object.values(manifest));
  return cb();
}

exports.default = series(hashAssets, log);