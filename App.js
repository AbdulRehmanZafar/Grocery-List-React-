
import Header from './Header.js';
import SearchItem from './SearchItem.js';
import AddItem from './AddItem.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState } from 'react';

function App() {
  const [items , setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')));

    const [newItem , setNewItem] = useState('');

    const [search , setSearch] = useState('');

    const setAndSaveItems = (newItem) => {
      setItems(newItem);
      localStorage.setItem('shoppingList' , JSON.stringify(newItem));
    }
  
    const addItem = (item) => {
      const id = item.length ? item[item.length - 1] + 1 : 1;
      const myNewItem = { id , checked:false , item };
      const listItems = [...items , myNewItem];
      setAndSaveItems(listItems);
    }

    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? {...item,checked :!item.checked} : item);
      setAndSaveItems(listItems);
    }
    
    const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setAndSaveItems(listItems);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem);
      setNewItem('');
    }
 
  return (
    <div className="App">

      <Header title="Grocery list" />
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem 
        search = {search}
        setSearch = {setSearch}      
      />
      <Content 
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;
