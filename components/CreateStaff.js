import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SendMail from './SendMail';

const CreateStaff = () => {
  const [staffNumber, setStaffNumber] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const navigation = useNavigation();

  const handleCreate = async () => {
    try {
      const { data } = await axios.post('https://crudcrud.com/api/198a700b663540bb838c93bc09f57bbc/zamara', {
        staffNumber,
        staffName,
        staffEmail,
        department,
        salary,
      });
      
      // Send the mail
      const subject = 'Profile Notification #Created';
      const text = `Greeting ${staffName}, we are glad to inform you that your staff profile has been created.`;

      SendMail(staffEmail, subject, text);

      // Reset the input fields
      setStaffNumber('');
      setStaffName('');
      setStaffEmail('');
      setDepartment('');
      setSalary('');
      navigation.navigate('Staff');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Staff Number"
        value={staffNumber}
        onChangeText={(text) => setStaffNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Staff Name"
        value={staffName}
        onChangeText={(text) => setStaffName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Staff Email"
        value={staffEmail}
        onChangeText={(text) => setStaffEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={(text) => setDepartment(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />
      <Button
        title="Create"
        onPress={handleCreate}
        style={styles.createButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    input: {
      width: '80%',
      padding: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    createButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
      },
  });

export default CreateStaff;
