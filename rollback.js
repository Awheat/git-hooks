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





//============================================


/**
 * @desc git status
*/
async function getStatus() {
    try {
        return await git.status();
    } catch (err) {
        console.log('git_status报错:', err);
    }
}


/**
 * @desc git add
*/
async function getAdd() {
    try {
        await git.add('./*');
    } catch (err) {
        console.log('git_add报错:', err);
    }
}

/**
 * @desc git commit
*/
async function getCommit() {
    try {
        await git.commit('feat: commit roolback branch...');
    } catch (err) {
        console.log('git_commit报错:', err);
    }
}


/**
 * @desc git pull
*/
async function getPull() {
    try {
        await git.pull();
    } catch (err) {
        console.log('git_pull报错:', err);
    }
}

/**
 * @desc 推送当前分支修改
*/
async function getPushCurrBranch() {
    try {
        const bname = await git.raw(['branch']);

        await git.push('origin', bname);
    } catch (err) {
        console.log('推送当前分支报错:', err);
    }
}




/**
 * @desc 获取之前的分支名
*/
async function getPrevBranch() {
    try {
        return await git.raw(['branch']);
    } catch (err) {
        console.log('git_branch报错:', err);
    }
}

async function actionCommit() {
    try {
        const status = await getStatus();

        const { files, current } = status;


    } catch (err) {
        console.log('提交操作报错:', err);
    }
}


async function actionStepOne() {
    try {
        const status = await getStatus();

        const { files, current } = status;

        if (files.length) {
            await git.add('./*');

            await git.commit(`feat: 分支${current}修改提交`);

            await git.pull('origin', current);

            const push = await git.push('origin', current);

            console.log('---push---', push);
            if (push.update && Object.keys(push.update).length) {
                actionStepTwo();
            }
        } else {
            actionStepTwo();
        }
    } catch (err) {
        console.log('提交当前分支报错:', err);
    }
}

async function actionStepTwo() {
    try {
        const status = await getStatus();

        const { current } = status;

        await git.checkout(['-b', 'rollback_dev']);

        await git.mergeFromTo('origin/master', 'rollback_dev');

        await git.add('./*');

        await git.commit(`feat: 分支${current}修改提交`);

        await git.pull('origin', current);

        await git.push('origin', current);

    } catch (err) {
        console.log('获取回滚分支报错:', err);
    }
}


/**
 * @desc 开始执行
*/
async function run() {
    try {
        //PREV_BRANCH_NAME = await git.raw(['rev-parse', '--abbrev-ref', 'HEAD']);
        //console.log('res:', PREV_BRANCH_NAME);

        actionStepOne();

        //await git.pull('origin', 'dev1.1');
    } catch (err) {
        console.log('函数run报错:', err);
    }
}


run();