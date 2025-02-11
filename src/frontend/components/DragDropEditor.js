import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const ItemTypes = { WIDGET: 'widget' };

const Widget = ({ id, content, moveWidget }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '10px', border: '1px solid gray', margin: '5px', cursor: 'move' }}>
      {content}
    </div>
  );
};

const DropArea = ({ widgets, moveWidget }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => moveWidget(item.id),
  }));

  return (
    <div ref={drop} style={{ minHeight: '200px', padding: '20px', border: '2px dashed gray' }}>
      {widgets.map((widget, index) => (
        <Widget key={index} id={index} content={widget} moveWidget={moveWidget} />
      ))}
    </div>
  );
};

const DragDropEditor = () => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    socket.on('live-update', (data) => {
      setWidgets(data.updatedConfig);
    });

    return () => socket.off('live-update');
  }, []);

  const moveWidget = (id) => {
    setWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets, `Widget ${prevWidgets.length + 1}`];
      socket.emit('update-preview', { updatedConfig: updatedWidgets });
      return updatedWidgets;
    });
  };

  const saveChanges = async () => {
    await axios.post('/api/user-theme/save/1', { customConfig: JSON.stringify(widgets), cssConfig: '', jsConfig: '' });
    alert('Changes saved successfully!');
  };

  const publishStore = async () => {
    await axios.post('/api/user-theme/publish/1');
    alert('Store published successfully!');
  };

  const resetStore = async () => {
    await axios.post('/api/user-theme/reset/1');
    setWidgets([]);
    alert('Store reset to default!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Drag & Drop Store Editor</h2>
      <DropArea widgets={widgets} moveWidget={moveWidget} />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={publishStore}>Publish Store</button>
      <button onClick={resetStore}>Reset Store</button>
    </DndProvider>
  );
};

export default DragDropEditor;
