# Gotta Ask

## regarding data:
Data files inside `src/app/data` are incomplete.  
If you are the author of this app (you are Paulo Velho, I am sorry for that), then you need to get the real files from the vault inside high-security facility and update them there before generating the data.

## generating app
the file `platypus.keystore` is also missing. You will need it to generate apk files for android. Go get it!  
Generation codes are below.  


--- 
### useful scrips:

`ng generate module features/about`
`ng generate component features/about/components/credits`

### ionic
Android: `ionic cordova run android --verbose -l -c -s --debug`


### app generation:
ionic generation
`ionic cordova build --release android --verbose`

apk generate:
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore platypus.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platypus`

sign:
`zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./GottaAsk.apk`