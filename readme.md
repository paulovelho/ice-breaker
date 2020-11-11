

### useful scrips:

`ng generate module features/about`
`ng generate component features/about/components/credits`

### ionic
Android: `ionic cordova run android --verbose -l -c -s --debug`


### app generation:
apk generate:
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore platypus.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platypus`

sign:
`zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./GottaAsk.apk`