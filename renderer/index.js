document.getElementById('go').addEventListener('click', async () => {
  const url = document.getElementById('url').value;
  if (!url) return alert('Insira uma URL.');

  const result = await window.electronAPI.fetchHTML(url);

  if (result.success) {
    alert('HTML copiado e aberto com sucesso!');
  } else {
    alert('Erro: ' + result.error);
  }
});
