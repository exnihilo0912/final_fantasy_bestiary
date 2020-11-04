import { MongoClient } from 'mongodb';
import React, { useState, useEffect } from 'react';
import { render, Text, Box } from 'ink';

const uri = "mongodb+srv://console:console1234@main.rysce.mongodb.net/FinalFantasyDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const Database = {
  findOne: async (criteria, collectionName) => {
    await client.connect();

    const collection = client.db("FinalFantasyDatabase").collection(collectionName);
    return await collection.findOne(criteria);
    
  }
}
const FFDB = {
  findMonster: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {}, 
    }, 'monsters');
  },
  findItem: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {},
    }, 'items');
  },
  findCharacter: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {}, 
    }, 'characters');
  },
  findEquipment: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {}, 
    }, 'equipments');
  },
  findEidolon: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {}, 
    }, 'eidolons');
  },
  findNpc: async ({ name, id, game, }) => {
    return await Database.findOne({
      ...name ? {name: { en: name}} : {}, 
      ...id ? {_id: id} : {}, 
      ...game ? {gameId: game} : {}, 
    }, 'npcs');
  },
};

const Equipment = ({ item }) => {
  const properties = [
    'atk',
    'def',
    'spd',
    'spt',
    'mge',
    'eva',
    'm.eva',
    'm.def',
    'price',
  ]

  const { name, gameId, inGameId, property, price } = item || {};
  
  return (
    <Box flexDirection="column" width="100%" height="100%">
      <Box height="80%">
        <Box borderStyle="single" height="100%" width="30%">
          <Text alignItems="center" justifyContent="center">
           Image
          </Text>
        </Box>
        <Box justifyContent="flex-end">
          {
            properties.map(val => (
              <Box key={val} flexDirection="column" borderStyle="single" alignItems="center" paddingX={1} height={4}>
                <Text>{val.toUpperCase()}</Text>
                <Text>{property && property[val] || 0}</Text>
              </Box>
            ))
          }
        </Box>
      </Box>
      <Box height="20%" borderStyle="single" width="100%">
        <Text>Flavor Text: {price} - {gameId}</Text>
      </Box>
    </Box>
  );
}

const App = (props) => {
  const [search, setSearch] = useState('');
  const [equipment, setEquiptment] = useState({});
  
  useEffect( () => {
    const getEquipment = async () => {
      const newEquipment = await FFDB.findEquipment({id: 1});
  
      setEquiptment(newEquipment);
  
      return () => client.close()
     };
     getEquipment();
  }, []);

  return (
    <Box width="100%" borderStyle="single" flexDirection="column">
      <Box width="100%" borderStyle="single" justifyContent="center">
        <Text bold>Final Fantasy Database</Text>
      </Box>
      <Box width="100%" height={30}>
        <Equipment item={equipment} />
        <Box width="30%" borderStyle="single" flexDirection="column" justifyContent="center" alignItems="center"><Text>Menu</Text></Box>
      </Box>
    </Box>
  );
}

const Item = () => {

}

const Monster = () => {

}

async function run() {
  const monster = await FFDB.findMonster({id: 1});
  const item = await FFDB.findItem({id: 1});
  const equipment = await FFDB.findEquipment({id: 1});
}

render(<App/>)