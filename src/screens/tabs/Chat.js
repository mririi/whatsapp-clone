import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import CustomDarkBackground from '@components/CustomDarkBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '@constants/colors';
import normalize from 'react-native-normalize';
import CustomText from '@components/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import * as contactsActions from '@store/actions/contacts';
import CustomLoading from '../../components/CustomLoading';
import CustomMessageBox from '../../components/CustomMessageBox';

const Chat = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const contactsDATA = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

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

  return (
    <CustomDarkBackground>
      <>
        {loading && <CustomLoading />}
        {!loading && (
          <>
            <Icon
              name="plus"
              size={35}
              onPress={() => {}}
              color={colors.textDark}
              style={{ position: 'absolute', top: normalize(60), right: normalize(30) }}
            />
            <CustomText style={{ marginTop: normalize(25) }}>Messages</CustomText>
            <View style={{ marginTop: normalize(20) }}>
              <FlatList
                data={contacts}
                renderItem={({ item }) => (
                  <CustomMessageBox
                    contact={item}
                    onPress={() =>
                      navigation.navigate('chatBox', {
                        contact: item,
                      })
                    }
                  />
                )}
                keyExtractor={(item) => item.email}
              />
            </View>
          </>
        )}
      </>
    </CustomDarkBackground>
  );
};

export default Chat;
