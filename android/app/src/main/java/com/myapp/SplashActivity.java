package com.myapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent fcmIntent = this.getIntent();
        Bundle bundle = fcmIntent.getExtras();

        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtras(fcmIntent);
        startActivity(intent);
        finish();
    }
}