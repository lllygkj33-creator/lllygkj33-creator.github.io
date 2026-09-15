import { getCollection } from 'astro:content';

// 顶部横向菜单：顺序就是这里的顺序
// groups 决定左栏分组的显示名和顺序；没列到的文件夹自动排在后面（用文件夹名当标题）
export const sections = [
  { id: 'seo', label: 'SEO', groups: [['basics', '概览'], ['on-page', '站内 SEO'], ['off-page', '站外 SEO']] },
  { id: 'geo', label: 'GEO', groups: [['basics', '概览'], ['on-page', '站内'], ['platforms', '平台']] },
  { id: 'method', label: '方法论', groups: [['basics', '概览'], ['process', '流程'], ['assets', '资产']] },
  { id: 'google-algorithm', label: 'Google 算法', groups: [['basics', '概览'], ['systems', '系统'], ['respond', '应对']] },
];

/* 以后再加栏目：把对应那行移进上面的数组，并建好 content/<id>/index.md
  { id: 'xeo', label: 'XEO', groups: [['basics', '概览'], ['pairing', '配合'], ['platforms', '平台']] },
  { id: 'programmatic-seo', label: '程序化 SEO', groups: [['basics', '概览'], ['build', '执行'], ['risk', '风险']] },
  { id: 'prompts', label: '提示词' },
  { id: 'skills', label: '技能' },
  { id: 'blog', label: '博客' },
  { id: 'project', label: '项目' },
  { id: 'about-me', label: '关于我' },
*/

// 目录标题来自 frontmatter.title，'index' 是站点首页；'seo' 是 content/seo/index.md
export const urlOf = (id) => (id === 'index' ? '/' : `/${id}/`);

// 子文件夹名 -> 左栏分组标题：'content-ops' -> 'Content Ops'
const labelOf = (folder) =>
  folder.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

export async function getNav() {
  const all = await getCollection('docs');
  const byOrder = (a, b) => a.order - b.order || a.title.localeCompare(b.title);

  return sections.map((s) => {
    const pages = all
      .filter((p) => p.id === s.id || p.id.startsWith(`${s.id}/`))
      .map((p) => {
        // 'seo' -> 栏目首页；'seo/xxx' -> 直属页面；'seo/basics/xxx' -> 分组页面
        const rest = p.id === s.id ? '' : p.id.slice(s.id.length + 1);
        const folder = rest.includes('/') ? rest.split('/')[0] : undefined;
        return { title: p.data.title, url: urlOf(p.id), order: p.data.order, folder };
      });

    const groups = [];
    const root = pages.filter((p) => !p.folder).sort(byOrder);
    if (root.length) groups.push({ label: '', pages: root });

    const configured = s.groups ?? [];
    const folders = [...new Set(pages.map((p) => p.folder).filter(Boolean))];
    folders.sort((a, b) => {
      const ia = configured.findIndex(([id]) => id === a);
      const ib = configured.findIndex(([id]) => id === b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });

    for (const folder of folders) {
      const label = configured.find(([id]) => id === folder)?.[1] ?? labelOf(folder);
      groups.push({ label, pages: pages.filter((p) => p.folder === folder).sort(byOrder) });
    }

    // 没建栏目首页时，菜单直接指向该栏第一个页面，避免指向不存在的地址
    const first = groups[0]?.pages[0]?.url;
    const url = s.url ?? (pages.some((p) => p.url === `/${s.id}/`) ? `/${s.id}/` : first ?? `/${s.id}/`);

    // pages 是扁平的整栏顺序，页面底部的上/下页按它走
    return { ...s, url, groups, pages: groups.flatMap((g) => g.pages) };
  });
}
