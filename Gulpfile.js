const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpSequence = require('gulp-sequence');
const nodemon = require('gulp-nodemon');
const path = require('path');
const Cache = require('gulp-file-cache');
const sourcemaps = require('gulp-sourcemaps');

const cache = new Cache();

const packages = {
    api: ts.createProject('src/api/tsconfig.json'),
    db: ts.createProject('src/db/tsconfig.json'),
    dbsync: ts.createProject('src/dbsync/tsconfig.json'),
    common: ts.createProject('src/common/tsconfig.json')
};
const modules = Object.keys(packages);
const source = 'src';
const distId = process.argv.indexOf('--dist');
const dist = distId < 0 ? 'node_modules/@lxdhub' : process.argv[distId + 1];
const scriptId = process.argv.indexOf('--script');


gulp.task('default', function () {
    modules.forEach(module => {
        gulp.watch(
            [`${source}/${module}/**/*.ts`, `${source}/${module}/*.ts`],
            [module]
        );
    });
});

modules.forEach(module => {
    gulp.task(module, () => {
        if (dist !== 'lib') {
            gulp.src(`lib/${module}/package.json`)
                .pipe(gulp.dest(`${dist}/${module}`));
        }
        return packages[module]
            .src()
            .pipe(sourcemaps.init())
            .pipe(cache.filter())
            .pipe(packages[module]())
            .pipe(cache.cache())
            .pipe(sourcemaps.write(`.`, { includeContent: false, sourceRoot: '../src' }))
            .pipe(gulp.dest(`${dist}/${module}`));

    });
});

modules.forEach(module => {
    gulp.task(module + ':serve', () => {
        let script;
        if (scriptId < 0) {
            if (dist) {
                script = path.join(dist, module, 'index.js')
            }
        } else {
            script = process.argv[scriptId + 1]
        }

        return nodemon({
            script,
            ignore: 'src/**/*.spec.ts',
            ext: 'ts',
            watch: ['src/**/*.ts'],
            tasks: [module]
        })
    });
})

gulp.task('build', function (cb) {
    gulpSequence('common', 'db', modules.filter((module) => module !== 'db' && module !== 'common'), cb);
});
