import { computePosition, offset, autoPlacement, autoUpdate } from '@floating-ui/dom';

const roots = document.querySelectorAll('[data-tooltip-root]');
roots.forEach((root) => {
  const popup = root.querySelector('[data-tooltip-popup]') as HTMLElement;
  if (!popup) return;

  function updatePosition() {
    computePosition(root, popup, {
      middleware: [offset(10), autoPlacement({ rootBoundary: 'viewport' })],
    }).then(({ x, y }) => {
      Object.assign(popup.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
  autoUpdate(root, popup, updatePosition, {
    ancestorResize: true,
  });
});
