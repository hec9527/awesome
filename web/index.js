function createSection(title, links) {
  const wrapper = document.createElement('div');
  const head = document.createElement('h2');
  const content = document.createElement('div');

  wrapper.classList.add('section');
  head.classList.add('section-title');
  content.classList.add('section-content');

  head.innerHTML = title;

  links.forEach(link => {
    const box = document.createElement('a');
    const cover = document.createElement('div');
    const iframe = document.createElement('iframe');

    const linkDir = link.split('/');
    let name = '';

    while (!name || name == 'index') {
      name = linkDir.pop().split('.')[0];
    }

    box.classList.add('box');
    box.href = link;
    box.target = '__blank';
    cover.classList.add('cover');
    cover.innerHTML = name;

    iframe.src = link;
    iframe.width = 1024;
    iframe.height = 768;
    box.appendChild(cover);
    box.appendChild(iframe);
    content.appendChild(box);
  });

  wrapper.appendChild(head);
  wrapper.appendChild(content);
  document.body.appendChild(wrapper);
}

const fileMap = files || {};

Object.keys(fileMap).forEach(key => {
  createSection(key, fileMap[key]);
});
