/**
 * ========================
 * 2022-07-26
 * 1.检出一个分支rollback_dev分支(可能已经存在)
 * 2.合并master分支代码到rollback_dev
 * 3.charry_up pageConfig.js文件到rollback_dev
 * 4.提交rollback_dev分支到远程
 * 5.切换到原来开发分支
 * 6.调用arthur自动构建
 * ========================
*/
const simpleGit = require('simple-git');

const git = simpleGit('./');

const actionInit = async () => {
    const { files, current } = await git.status();

    if (files.length) {
        await git.add('./*');

        await git.commit(`feat: 分支${current}修改提交`);

        await git.pull('origin', current);

        await git.push('origin', current);
        console.log('---log1---')
        await git.checkout(['-b', 'rollback_dev']);
    } else {
        console.log('---log2---')
        await git.checkout(['-b', 'rollback_dev']);
    }
}

actionInit();


