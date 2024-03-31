import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Alert, FlatList, KeyboardAvoidingView } from 'react-native';
import CustomDarkBackground from '@components/CustomDarkBackground';
import normalize from 'react-native-normalize';
import colors from '@constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import * as messagesActions from '@store/actions/contacts';
import CustomLoading from '@components/CustomLoading';
import CustomMessageContainer from '../../components/CustomMessageContainer';
import CustomText from '../../components/CustomText';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const ChatBox = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesDATA = useSelector((state) => state.contacts.messages);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    if (!messagesDATA) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [messagesDATA]);

  useEffect(() => {
    if (messagesDATA) {
      setMessages(messagesDATA);
    }
  }, [messagesDATA]);

  const loadMessages = useCallback(async () => {
    try {
      setError(null);
      await dispatch(messagesActions.fetchMessagesPerContact(route?.params?.contact?.email));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, route?.params?.contact?.email]);

  useEffect(() => {
    setLoading(true);
    loadMessages();
  }, [loadMessages]);

  const sendMessage = async () => {
    if (text.trim() === '') return;
    const action = messagesActions.sendMessage({
      sender: email,
      receiver: route?.params?.contact?.email,
      text: text,
      timestamp: Date.now(),
    });
    setText('');
    try {
      setError(null);
      await dispatch(action);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CustomDarkBackground>


      {loading && <CustomLoading />}
      {!loading && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: normalize(10),
              borderColor: colors.secondaryDarker,
              paddingBottom: normalize(10),
              borderBottomWidth: 2,
            }}>
            <Icon
              name="arrow-left"
              size={35}
              style={{ marginHorizontal: normalize(10) }}
              color={colors.secondary}
              onPress={() => navigation.pop(1)}
            />
            <View
              style={{
                width: normalize(40),
                height: normalize(40),
                borderRadius: normalize(30),
                borderWidth: 2,
                borderColor: colors.secondary,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText style={{ fontSize: normalize(20), color: colors.textDark }}>
                {route?.params?.contact?.name.charAt(0).toUpperCase()}
              </CustomText>
            </View>
            <CustomText style={{ marginLeft: normalize(10) }}>Chat with {route?.params?.contact?.name}</CustomText>
          </View>
          <KeyboardAvoidingView>

          <View style={{ marginVertical: normalize(15), height: '90%' }}>
            <View style={{ width: '100%', height: '100%', alignSelf: 'center', borderColor: colors.secondaryDarker }}>
              <FlatList
                data={messages}
                renderItem={({ item }) => <CustomMessageContainer message={item} currentEmail={email} />}
              />
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput
              style={{
                width: '95%',
                height: normalize(40),
                borderWidth: 2,
                borderColor: colors.secondary,
                alignSelf: 'center',
                color: colors.textDark,
                borderRadius: 25,
                paddingHorizontal: normalize(20),
              }}
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Icon
              style={{ position: 'absolute', right: normalize(25), top: normalize(10) }}
              name="send"
              size={20}
              onPress={sendMessage}
              color={colors.secondary}
            />
          </View>
            </View>
            
          </View>
          </KeyboardAvoidingView>

        </View>
      )}

     </CustomDarkBackground>
  );
};

export default ChatBox;
