const userreq = process.argv.splice(2);
const fs = require('fs')
const path = require('path')
const fileType = {
    Audio:['aif','cda','mid','midi','mp3','mpa','ogg','wav','wma','wpl'],
    Compressed:['7z','arj','deb','pkg','rar','rpm','tar','gz','z','zip'],
    dataBase:['csv','dat','db','dbf','log','mdb','sav','sql','tar','xml'],
    Executable:['apk',"bat",'bin','cgi','pl','com','exe','gadget','jar','msi','py','wsf'],
    Image:['ai','bmp','gif','ico','jpeg',"jpg",'png','ps','psd','svg','tif','tiff'],
    readable:['txt','asp','cer','cfm','cgi','pl','css','htm','html','js','jsp','part','php','py','rss','xhtml','pdf']
}
if (userreq.length >= 1) {

        switch (userreq[0]) {
            case 'orgnize':
                console.log('orgnizing.......');
                const dirname = userreq[1]
                orgnizefn(dirname);
                console.log('orgnized !')
                
                break;
            case 'tree':
                console.log('Making Tree.......');
                treefn();
                console.log('Done ! ');
                break;

            case 'help':
               console.log('Orgnize -----> node [scriptPath] orgnize [folderPath]')
               console.log('Orgnize -----> node [scriptPath] tree [folderPath]')
               console.log('Orgnize -----> node [scriptPath] help')
                break;
            default:
                console.log(`Unknown Command Try different Or take
                     Help-----> node [file name] help.......`);
                break;
        }
    

} else {
    console.log(`command Not Found Try To Give Command Or Take Help
     Help-----> node [file name] help.......`);
}

//orgnize command handler

function orgnizefn(dirname){
    
    fs.readdir(dirname, (err, files) => {
        if (!err) {
            const destpath = path.join(dirname,'OrgnizedFolder')
            const isexist =  fs.existsSync(destpath)
            if(isexist){
                orgnizeFilesfn(dirname,destpath,files);
            }else{
                const dirpath = path.join(dirname,'OrgnizedFolder')
                fs.mkdirSync(dirpath)
                orgnizeFilesfn(dirname,destpath,files);

            }
           

        } else {
            console.log('Error Found:',err);
        }
    })
}

//orgnizeFilesfn
function orgnizeFilesfn(dirname,destsrc,files){
    for (let i = 0; i < files.length; i++) {

        const file = path.join(dirname,files[i]);
        if(path.extname(file)){
            //heandling files
           const extentionName =  path.extname(file).slice(1)
           
           for(let ftype in fileType){
            const type = fileType[ftype]
                for (let i = 0; i < type.length; i++) {
                    const conatinExt =type[i] ==extentionName ;
                    if(conatinExt){
                        const dirsrc = path.join(destsrc,ftype)
                        if(!(fs.existsSync(dirsrc))){

                            fs.mkdirSync(dirsrc,(err)=>{
                                if(err){
                                    
                                    console.log(err);
                                }
                            })
                           
                        }
                        moveFile(file,dirsrc)
                    }
                    
                    
                }
            }
        }


    }
}

function moveFile(src,destsrc){
    const dsrc = path.join(destsrc,path.basename(src))
    fs.copyFileSync(src,dsrc)
    fs.unlinkSync(src)

}

//tree command runner
function treefn() {

    fs.readdir(dirname, (err, files) => {
        if (!err) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(file);

            }

        } else {
            console.log(err);
        }
    })
}