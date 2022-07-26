const simpleGit = require('simple-git');

const git = simpleGit('./');

let PREV_BRANCH_NAME = '';

/**
 * ============
 * 1.检出一个分支rollback_dev分支(可能已经存在)
 * 2.合并master分支代码到rollback_dev
 * 3.charry_up pageConfig.js文件到rollback_dev
 * 4.提交rollback_dev分支到远程
 * 5.切换到原来开发分支
 * 6.调用arthur自动构建
 * ============
*/


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


async function actionStepOne() {
    const status = await getStatus();

    const { files } = status;
    const curr = await git.raw(['rev-parse', '--abbrev-ref', 'HEAD']);
    console.log('--aaa---', status, curr);
    if (files.length) {
        const a = await git.add('./*');
        console.log('---a---', a);
        const b = await git.commit(`feat: 推送当前${curr}分支修改`);
        console.log('---b---', b);
        const c = await git.pull('origin', 'dev1.1');
        console.log('---c---', c);
        const last = await git.push('origin', 'dev1.1');

        console.log('---last---', last);
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
