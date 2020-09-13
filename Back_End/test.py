from zerodb.afgh import crypto
me = crypto.Key.from_passphrase("my passphrase")
bob = crypto.Key.from_passphrase("bob passphrase")
bob_public_key = bob.dump_pub()
my_data = "Hello World"
encrypted_data = me.encrypt(my_data)
re_key = me.re_key(bob.dump_pub())
rencrypted_msg = re_key.reencrypt(encrypted_data)
if bob.decrypt_re(rencrypted_msg) == my_data:
    print("success")