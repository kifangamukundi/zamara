import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SendMail from './SendMail';

const Staff = () => {
  const navigation = useNavigation();
  const [staffs, setStaffs] = useState([]);

  const handleCreateStaff = () => {
    navigation.navigate('CreateStaff');
  };
  const handleEditStaff = (_id) => {
    navigation.navigate('UpdateStaff', { _id });
  };

  function handleDeleteStaff(staffId, staffName, staffEmail) {
    axios.delete(`https://crudcrud.com/api/198a700b663540bb838c93bc09f57bbc/zamara/${staffId}`)
      .then(response => {
        // Send the mail
      const subject = 'Profile Notification #Deleted';
      const text = `Greeting ${staffName}, we are sad to inform you that your staff profile has been deleted.`;

      SendMail(staffEmail, subject, text);

        // handle successful deletion
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        // handle error
        console.log(error)
      });
  }
  

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await axios.get(
          'https://crudcrud.com/api/198a700b663540bb838c93bc09f57bbc/zamara'
        );
        console.log(data);
        setStaffs(data);
        
      } catch (error) {
        console.error(error);
      }
    };
    // Call fetchStaff immediately
    fetchStaff();
  }, []);

  return (
    <View style={styles.table}>
      <Button title="CreateStaff" onPress={handleCreateStaff} />
      <View style={styles.row}>
        <Text style={styles.header}>Staff Number</Text>
        <Text style={styles.header}>Staff Name</Text>
        <Text style={styles.header}>Staff Email</Text>
        <Text style={styles.header}>Department</Text>
        <Text style={styles.header}>Salary</Text>
      </View>

      {staffs?.map((staff) => (
      <View style={styles.row} key={staff._id}>
        <Text style={styles.cell}>{staff.staffNumber}</Text>
        <Text style={styles.cell}>{staff.staffName}</Text>
        <Text style={styles.cell}>{staff.staffEmail}</Text>
        <Text style={styles.cell}>{staff.department}</Text>
        <Text style={styles.cell}>{staff.salary}</Text>
        <Button
          title="Edit"
          onPress={() => handleEditStaff(staff._id)}
        />
        <Button
          title="Delete"
          onPress={() => handleDeleteStaff(staff._id, staff.staffName, staff.staffEmail)}
        />
      </View>
      ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    fontWeight: 'bold',
    flex: 1,
    padding: 10,
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});

export default Staff;
