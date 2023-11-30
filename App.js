import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import Tarefas from './src/database/Tarefas';

// Funções de adicionar e excluir tarefa

const printTarefas = (tarefas) => {
  console.log(`id:${tarefas.id}, descricao:${tarefas.descricao}`)
}

/*
export default function App() {

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    // Exemplo de leitura de todas as tarefas ao carregar o componente
    Tarefas.all()
      .then((result) => {
        setTarefas(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Check Console</Text>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => printTarefa(item)}>
            <Text>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/



const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(()=>{

  })
  
  let currentId = 0;

  const addTexto = () => {
    if (task.trim() !== '') {
      const novaTarefa = { descricao: task }; // Remove obj.id
      Tarefas.create(novaTarefa)
        .then((id) => {
          setTasks([...tasks, { id, ...novaTarefa }]);
          setTask('');
        })
        .catch((error) => console.error(error));
    }
  };


  const removeTexto = (id) => {
    Tarefas.remove(id)
      .then((rowsAffected) => {
        if (rowsAffected > 0) {
          const newTasks = tasks.filter((item) => item.id !== id);
          setTasks(newTasks);
        }
      })
      .catch((error) => console.error(error));
  };

  // Visualização

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar nova tarefa"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTexto}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.taskItem}>
      <Text>{item.descricao}</Text>
      <TouchableOpacity onPress={() => removeTexto(item.id)}>
        <Text style={styles.deleteButton}>Excluir</Text>
      </TouchableOpacity>
    </View>
  )}
/>

    </View>
  );
};

// Estilização

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
