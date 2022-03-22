package com.canconnect; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.app.Activity;

public class EnableDiscovery extends ReactContextBaseJavaModule {
    EnableDiscovery(ReactApplicationContext context) {
       super(context);
   }
   
    @Override
    public String getName() {
        return "EnableDiscovery";
    }

    @ReactMethod
    public void Test(Callback cb) {
        cb.invoke("test function callback");
     }

    @ReactMethod
    public void EnableAppDiscovery(Callback cb){
        ReactApplicationContext context = getReactApplicationContext();
        int requestCode = 1;
        Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
        discoverableIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300);
        context.startActivity(discoverableIntent);
        cb.invoke(true);
    }
}
