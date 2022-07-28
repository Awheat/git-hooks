/**
 * @desc 自动生成rollback_dev分支流程
 * 1. 查看当前分支是否有提交
 * 2. 若存在走提交流程
 * 3. 
*/
const simpleGit = require('simple-git');

const git = simpleGit('./');


/** @desc 获取远程是否存在某个分支 */
const isExistBranch = async (bname) => {
    try {
        const res = await git.raw(['branch', '-r']);

        return res.indexOf(bname) > -1;
    } catch (err) {
        console.log('isExistBranch:', err);
        return -1;
    }
}

/** @desc 提交流程 */
const actionCommitFlow = async () => {
    try {
        const status = await git.status();
        const { current } = status;
        const isExist = await isExistBranch(`origin/${current}`);

        await git.add('./*');

        await git.commit('feat: 自动提交流程');

        await git.pull();

        if (isExist) {
            console.log('---1---')
            //await git.push();
        } else {
            console.log('---2---')
            //await git.push('origin', current);
        }
    } catch (err) {
        console.log('提交流程报错:', err);
    }
}

const actionInit = async () => {
    await actionCommitFlow();
    // const isExist = await isExistBranch('origin/rollback_dev');

    // console.log('-isExist-', isExist);
    //  await git.checkout(['-b', 'rollback_dev1', 'origin/main']);
    // if (isExist) {
    // 1.git checkout branch_name
    // 2.合并master代码到rollback分支
    // } else {
    // 1.git checkout -b branch_name
    // }

    // const { files, current } = await git.status();

    // try {
    //     if (files.length) {
    //         await git.add('./*');

    //         await git.commit(`feat: 分支${current}修改提交`);

    //         await git.pull('origin', current);

    //         await git.push('origin', current);
    //         console.log('---log1---')
    //         await git.checkout(['-b', 'rollback_dev1', 'origin/main']);
    //     }
    // } catch (err) {
    //     console.log('err:', err);
    // }
}

actionInit();