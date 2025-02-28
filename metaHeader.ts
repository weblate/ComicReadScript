import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from './package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 脚本依赖库与对应的 cdn url
 * 数组里的第一个 url 是生产模式下使用的，第二个是开发模式下使用的
 * 只有一个 url 表示不区分生产开发模式
 */
const resourceList: Record<string, [string, string] | [string]> = {
  'solid-js': [
    'https://unpkg.com/solid-js@1.7.3/dist/solid.cjs',
    'https://unpkg.com/solid-js@1.7.3/dist/dev.cjs',
  ],
  'solid-js/store': [
    'https://unpkg.com/solid-js@1.7.3/store/dist/store.cjs',
    'https://unpkg.com/solid-js@1.7.3/store/dist/dev.cjs',
  ],
  'solid-js/web': [
    'https://unpkg.com/solid-js@1.7.3/web/dist/web.cjs',
    'https://unpkg.com/solid-js@1.7.3/web/dist/dev.cjs',
  ],
  panzoom: ['https://unpkg.com/panzoom@9.4.3/dist/panzoom.min.js'],
  fflate: ['https://unpkg.com/fflate@0.7.4/umd/index.js'],
  dmzjDecrypt: [
    'https://greasyfork.org/scripts/467177-dmzjdecrypt/code/dmzjDecrypt.js?version=1207199',
  ],
};
const resource = {
  prod: Object.fromEntries(
    Object.entries(resourceList).map(([k, v]) => [k, v.at(0)]),
  ),
  dev: Object.fromEntries(
    Object.entries(resourceList).map(([k, v]) => [k, v.at(-1)]),
  ),
};

/** 根据 index.ts 的注释获取支持站点列表 */
const getSupportSiteList = () => {
  const indexCode = fs.readFileSync(resolve(__dirname, 'src/index.ts'), 'utf8');
  /** 支持站点列表 */
  return [...indexCode.matchAll(/(?<=\n\s+\/\/\s#).+(?=\n)/g)].map((e) => e[0]);
};

/** 更新 README 上的支持站点列表 */
export const updateReadme = () => {
  const readmePath = resolve(__dirname, 'README.md');
  const readmeMd = fs.readFileSync(readmePath, 'utf8');
  const newMd = readmeMd.replace(
    /(?<=<!-- supportSiteList -->\n\n).+(?=\n\n<!-- supportSiteList -->)/s,
    getSupportSiteList()
      .slice(5)
      .map((siteText) => `- ${siteText}`)
      .join('\n'),
  );
  if (newMd !== readmeMd) fs.writeFileSync(readmePath, newMd);

  // 生成 README-out.md 文件，把相对链接改成 jsdelivr cdn 的链接，方便在其他站点显示图片
  const outMdPath = resolve(__dirname, 'docs/README-out.md');
  const outMd = fs.readFileSync(outMdPath, 'utf8');
  const newOutMd = newMd.replaceAll(
    /(?<=]\()\/.+\.(md)?.+\)/g,
    'https://cdn.jsdelivr.net/gh/hymbz/ComicReadScript$&',
  );
  if (newOutMd !== outMd) fs.writeFileSync(outMdPath, newOutMd);
};

/** 脚本头部注释 */
export const getMetaData = (isDevMode: boolean) => {
  const meta = {
    name: pkg.name,
    namespace: pkg.name,
    version: pkg.version,
    description: `${pkg.description}${getSupportSiteList().join('、')}`,
    author: pkg.author,
    license: pkg.license,
    noframes: true,
    match: '*://*/*',
    connect: [
      'cdn.jsdelivr.net',
      'yamibo.com',
      'dmzj.com',
      'idmzj.com',
      'exhentai.org',
      'e-hentai.org',
      'hath.network',
      'nhentai.net',
      'hypergryph.com',
      'mangabz.com',
      'copymanga.site',
      'self',
      '*',
    ],
    grant: [
      'GM_addElement',
      'GM_getResourceText',
      'GM_xmlhttpRequest',
      'GM.addValueChangeListener',
      'GM.removeValueChangeListener',
      'GM.getResourceText',
      'GM.addStyle',
      'GM.getValue',
      'GM.setValue',
      'GM.deleteValue',
      'GM.registerMenuCommand',
      'GM.unregisterMenuCommand',
      'unsafeWindow',
    ],
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACBUExURUxpcWB9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i2B9i////198il17idng49DY3PT297/K0MTP1M3X27rHzaCxupmstbTByK69xOfr7bfFy3WOmqi4wPz9/X+XomSBjqW1vZOmsN/l6GmFkomeqe7x8vn6+kv+1vUAAAAOdFJOUwDsAoYli9zV+lIqAZEDwV05SQAAAUZJREFUOMuFk+eWgjAUhGPBiLohjZACUqTp+z/gJkqJy4rzg3Nn+MjhwB0AANjv4BEtdITBHjhtQ4g+CIZbC4Qb9FGb0J4P0YrgCezQqgIA14EDGN8fYz+f3BGMASFkTJ+GDAYMUSONzrFL7SVvjNQIz4B9VERRmV0rbJWbrIwidnsd6ACMlEoip3uad3X2HJmqb3gCkkJELwk5DExRDxA6HnKaDEPSsBnAsZoANgJaoAkg12IJqBiPACImXQKF9IDULIHUkOk7kDpeAMykHqCEWACy8ACdSM7LGSg5F3HtAU1rrkaK9uGAshXS2lZ5QH/nVhmlD8rKlmbO3ZsZwLe8qnpdxJRnLaci1X1V5R32fjd5CndVkfYdGpy3D+htU952C/ypzPtdt3JflzZYBy7fi/O1euvl/XH1Pp+Cw3/1P1xOZwB+AWMcP/iw0AlKAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC',
    resource: resource[isDevMode ? 'dev' : 'prod'],
    supportURL: 'https://github.com/hymbz/ComicReadScript/issues',
    updateURL:
      'https://github.com/hymbz/ComicReadScript/raw/master/ComicRead.user.js',
    downloadURL:
      'https://github.com/hymbz/ComicReadScript/raw/master/ComicRead.user.js',
  };

  const keyLength = Math.max(...Object.keys(meta).map((key) => key.length)) + 1;

  const createMetaHeader = (metaData: Record<string, any>) => {
    const metaText = Object.entries(metaData)
      .filter(([, val]) => val)
      .map(([key, val]) => {
        switch (typeof val) {
          case 'boolean':
            return `// @${key}`;
          case 'object':
            return Array.isArray(val)
              ? val
                  .map((v) => `// @${key.padEnd(keyLength, ' ')} ${v}`)
                  .join('\n')
              : Object.entries(val)
                  .map(
                    ([k, v]) => `// @${key.padEnd(keyLength, ' ')} ${k} ${v}`,
                  )
                  .join('\n');
          default:
            return `// @${key.padEnd(keyLength, ' ')} ${val}`;
        }
      })
      .join('\n');

    return `// ==UserScript==\n${metaText}\n// ==/UserScript==\n\n`;
  };

  return {
    meta,
    createMetaHeader,
  };
};
