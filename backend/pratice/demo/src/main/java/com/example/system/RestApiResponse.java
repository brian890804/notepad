package com.example.system;


public class RestApiResponse {
	private String resultCode;
	private Object data;

	public RestApiResponse(String resultCode, Object data) {
		this.resultCode = resultCode;
		this.data = data;
	}

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
