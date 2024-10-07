import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';

const PaymentMethods = () => {
  const cards = [
    { id: '1', type: 'Credit Card', number: '1234 5678 9012 3456', bankName: 'Bank Name', selected: true },
    { id: '2', type: 'Credit Card', number: '1234 5678 9012 3456', bankName: 'Bank Name', selected: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>
      <FlatList
        data={cards}
        horizontal
        renderItem={({ item }) => (
          <View style={item.selected ? styles.cardSelected : styles.card}>
            <Text style={styles.cardText}>{item.number}</Text>
            <Text style={styles.cardText}>{item.bankName}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.subtitle}>other payment methods</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Credit Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Google Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Paypal</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f4f4f4', padding: 16, borderRadius: 8, marginRight: 8 },
  cardSelected: { backgroundColor: '#FFD700', padding: 16, borderRadius: 8, marginRight: 8 },
  cardText: { fontSize: 16 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  paymentOptions: { marginBottom: 16 },
  paymentOption: { paddingVertical: 8 },
  paymentOptionText: { fontSize: 18 },
  payButton: { backgroundColor: '#8B4513', padding: 16, borderRadius: 8, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PaymentMethods;