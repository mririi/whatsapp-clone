import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomDarkBackground from '@components/CustomDarkBackground';
import normalize from 'react-native-normalize';
import CustomText from '@components/CustomText';
import CustomContactCard from '@components/CustomContactCard';
import * as contactsActions from '@store/actions/contacts';
import CustomLoading from '../../components/CustomLoading';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const contactsDATA = useSelector((state) => state.contacts.contacts);

  const loadContacts = useCallback(async () => {
    try {
      setError('');
      await dispatch(contactsActions.fetchContacts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadContacts();
  }, [loadContacts]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    if (contactsDATA) {
      setContacts(contactsDATA);
    }
  }, [contactsDATA]);

  return (
    <CustomDarkBackground>
      {loading ? (
        <CustomLoading />
      ) : (
        <>
          <CustomText style={{ marginTop: normalize(25) }}>All Profiles</CustomText>
          <View style={{ marginTop: normalize(20) }}>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <CustomContactCard data={item} add={true} />}
            />
          </View>
        </>
      )}
    </CustomDarkBackground>
  );
};

export default Home;
