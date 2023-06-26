// main.js
const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')

const deleteButtons = document.querySelectorAll('#delete-button')

update.addEventListener('click', _ => {

    // Send PUT Request here
    fetch('/quotes', {

        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({
            name: 'ps',
            price: '80',
            image: ''
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        //console.log(response)

        // refresh -> browser
        window.location.reload(true)
    })
})

deleteButtons.forEach(deleteButton => {
    // Gắn bộ lắng nghe cho nút xóa
    deleteButton.addEventListener('click', () => {
      const name = deleteButton.value; // Lấy tên index từ nút xóa
  
      fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name //    dụng tên index để lấy id của phần tử trong mảng
        })
      })
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          window.location.reload(); // Tải lại trang sau khi xóa hoàn tất
        });
    });
  });




