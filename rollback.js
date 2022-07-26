// 资料
// https://blog.csdn.net/qq_39657585/article/details/102877239
// http://www.javascriptcn.com/post/51796


// simpleGit()
//     .addConfig('user.name', 'Some One')
//     .addConfig('user.email', 'some@one.com')
//     .commit('committed as "Some One"', 'file-one')
//     .commit('committed as "Another Person"', 'file-two', { '--author': '"Another Person <another@person.com>"' });

const simpleGit = require('simple-git');

const git = simpleGit('./');

const init = async () => {
    // console.log('---git---', git);
    // const res = await git.checkoutBranch('dev');
    // console.log('---res---', res);
    //const status = await git.status();
    // console.log('---status---', status);

    //----下面是通过的----

    // await git.status();

    // await git.add('./*');

    // await git.commit('测试111');

    // const a = await git.pull('origin', 'dev1.0');

    // console.log('---aa---', a);

    // const b = await git.push('origin', 'dev1.0');

    // console.log('---bb---', b);

    try {
        await git.checkout(['-b', 'dev1.1']);
    } catch (err) {
        console.log('--err--', err)
    }

    const mergeRes = await git.mergeFromTo('origin/dev1.0', 'dev1.1');

    console.log('--111--', mergeRes);

}

init();












const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const gitConfig = {};


/** @desc 获取git配置信息 */
const getRepConfig = () => {
    return new Promise((resolve, reject) => {
        const url = path.join(__dirname, '/.git/config');

        fs.readFile(url, 'utf-8', (err, data) => {
            if (!err && data) {
                const transform = data.split('\n\t');

                if (transform.length) {
                    transform.forEach(v => {
                        const temp = v.split("=");
                        if (temp.length > 1) {
                            const key = temp[0].trim();
                            const val = temp[1].trim().split('\n')[0];
                            gitConfig[key] = val;
                        }
                    });
                    resolve(gitConfig);
                }
            } else {
                reject(err);
            }
        });
    })
}

/** @desc 初始化函数 */
const init = async () => {
    try {
        const res = await getRepConfig();
        console.log('---res--', res);

        const git = simpleGit(res.url);

        const a = await git.init();
        console.log('999999:', git, a);

    } catch (err) {
        console.log(err);
    }
}

init();




// fs.readFile(path.join(__dirname, '/.git/config'), 'utf-8', (err, data) => {
//     //const arr = data.split('\n\t');
//     //console.log('---res---', data, data.split('\n\t'))
//     const temp = data.split('\n\t');

//     temp.forEach(v => {
//         console.log(v);
//         const arr = v.split("=");
//         console.log('--v--', arr);
//         if (arr.length > 1) {
//             const key = arr[0].trim();
//             const val = arr[1].trim().split("\n")[0];
//             gitConfig[key] = val;
//         }
//     });

//     console.log('--config---', gitConfig)
// })
// const getRepInfo = () => {
//     try {

//     } catch (err) {
//         console.log('getRepInfo:', err);
//     }
// }