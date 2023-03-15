import React , {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Image, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({});

    // Search for user by id passing the token
    useEffect(() => {
      axios.get(`https://dummyjson.com/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const {
          image,
          age,
          gender,
          email,
          phone,
          birthDate,
          bloodGroup,
          height,
          weight,
          eyeColor,
        } = res.data;

        setData({
          image: image,
          age: age,
          gender: gender,
          email: email,
          phone: phone,
          birthDate: birthDate,
          bloodGroup: bloodGroup,
          height: height,
          weight: weight,
          eyeColor: eyeColor,
        });
      })
      .catch(error => {
        console.error(error);
      });
    }, []);
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* from context */}
        <Text style={styles.headerText}>Welcome {user?.firstName} {user?.lastName},</Text>
        <Text style={styles.headerText}>Your UserName: {user?.username}</Text>
        {/* Data fetch */}
        <Image
          source={{ uri: data.image }}
          style={styles.image}
        />
        <Text style={styles.headerText}>Your profile details are as below:</Text>
      </View>
      {/* A loading spinner maybe */}
      <View style={styles.row}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{data.age}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{data.gender}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{data.phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Birthdate:</Text>
        <Text style={styles.value}>{data.birthDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Blood Group:</Text>
        <Text style={styles.value}>{data.bloodGroup}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{data.height} cm</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{data.weight} kg</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Eye Color:</Text>
        <Text style={styles.value}>{data.eyeColor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 2,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Dashboard;