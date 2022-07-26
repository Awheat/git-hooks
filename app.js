const simpleGit = require('simple-git');

const git = simpleGit('./');

const actionInit = async () => {
    const { files, current } = await git.status();

    try {
        if (files.length) {
            await git.add('./*');

            await git.commit(`feat: 分支${current}修改提交`);

            await git.pull('origin', current);

            await git.push('origin', current);
            console.log('---log1---')
            await git.checkout(['-b', 'rollback_dev1', 'origin/main']);
        }
    } catch (err) {
        console.log('err:', err);
    }
}

actionInit();