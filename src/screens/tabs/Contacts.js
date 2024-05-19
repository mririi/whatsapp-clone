import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomDarkBackground from '@components/CustomDarkBackground';
import normalize from 'react-native-normalize';
import CustomText from '@components/CustomText';
import CustomContactCard from '@components/CustomContactCard';
import * as contactsActions from '@store/actions/contacts';
import CustomLoading from '../../components/CustomLoading';

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const contactsDATA = useSelector((state) => state.contacts.contactsUser);
  console.log(contactsDATA);
  useEffect(() => {
    if (!contactsDATA) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [contactsDATA]);

  useEffect(() => {
    if (contactsDATA) {
      setContacts(contactsDATA);
    }
  }, [contactsDATA]);
  
  const loadContacts = useCallback(async () => {
    try {
      setError(null);
      await dispatch(contactsActions.fetchContactsCurrentUser());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    setLoading(true);
    loadContacts();
  }, [loadContacts]);

  return (
    <CustomDarkBackground>
      {loading ? (
        <CustomLoading />
      ) : !!contacts.length? (
        <>
          <CustomText style={{ marginTop: normalize(25) }}>Contacts</CustomText>
          <View style={{ marginTop: normalize(20) }}>
            <FlatList
              data={contacts}
              keyExtractor={() => '_' + Math.random().toString(36).substr(2, 9)}
              renderItem={({ item }) => <CustomContactCard data={item} />}
            />
          </View>
        </>
      ): (
        <CustomText style={{ marginTop: normalize(25) }}>No Contacts Found</CustomText>
      )}
    </CustomDarkBackground>
  );
};

export default Contacts;
