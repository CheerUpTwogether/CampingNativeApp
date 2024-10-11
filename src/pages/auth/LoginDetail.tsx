import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6';

const LoginDetail = () => {
  const [userInfo, setUserInfo] = useState<UserEditData>({
    nickname: "",
    introduce: "",
    profileimagepath: "",
  });

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.profileImageWrapper}>
            {userInfo.profileimagepath ?
              <Image source={{ uri: userInfo.profileimagepath }} style={styles.profileImage}/>
              :(
                <TouchableOpacity style={styles.noProfileWapper}>
                  <Icon name="user" size={120} color="#AEB6B9" solid  />
                  <View style={styles.noProfileContainer}>
                    <Icon name="camera" size={24} color="#AEB6B9" solid  />
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{marginTop: 24}}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textStyle}>닉네임</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor="#999"
                value={userInfo.nickname}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, nickname: text })
                }
                autoCapitalize="none"
                maxLength={12}
              />
              <Text style={{ color: "#386641", fontSize: 12, marginBottom: 8 }}>
                * 닉네임은 12자까지 입력할 수 있습니다.
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.textStyle}>소개</Text>
              <TextInput
                style={[styles.inputStyle, { height: 100 }]}
                placeholder="나를 소개해주세요."
                placeholderTextColor="#999"
                autoCorrect={false}
                autoCapitalize="none"
                value={userInfo.introduce}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, introduce: text })
                }
                multiline={true}
                numberOfLines={3}
                maxLength={100}
              />
              <Text style={{ color: "#386641", fontSize: 12 }}>
                * 소개는 100자까지 입력할 수 있습니다.
              </Text>
            </View>

            <TouchableOpacity
              style={{ marginVertical: 12, marginHorizontal: 24 }}
              //onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButton}>저장하기</Text>
            </TouchableOpacity>
          </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  noProfileWapper: {
    backgroundColor: "#E0E5E9", 
    borderRadius: 100, 
    height: 160, 
    width: 160, 
    justifyContent: 'center',
    alignItems: "center",
  },
  noProfileContainer: {position: 'absolute', right: 0, bottom: 0, backgroundColor: '#fff', padding: 8, borderRadius: 100, borderColor: "#ddd", borderWidth: 1},
  profileImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  profileImage: { 
    width: 160, 
    height: 160, 
    borderRadius: 100 
  },
  profileChangeWrapper: {
    borderRadius: 20,
    backgroundColor: "#a7c957",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: { marginHorizontal: 24, marginVertical: 8 },
  textStyle: { 
    color: "#333", 
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 16
  },
  inputStyle: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
    borderRadius: 8,
    color: "#555",
    fontWeight: "500",
    textAlignVertical: 'top'
  },
  buttonWrapper: { 
    alignItems: "center", 
    marginVertical: 20 
  },
  saveButton: {
    fontWeight: "600",
    fontSize: 16,
    width: "100%",
    height: 48,
    textAlign: "center",
    justifyContent: 'center',
    borderRadius: 12,    
    borderColor: "#6a994e",
    color: "#FFF",
    backgroundColor: "#6a994e",
    textAlignVertical: 'center'
  },
});


export default LoginDetail