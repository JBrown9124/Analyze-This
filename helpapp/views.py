from django.shortcuts import render
import sys
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.core import serializers
from .models import *
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseServerError
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .firestore import db
import json
from .ResponseModels.conflict import Conflict
from .ResponseModels.location import Location
from .ResponseModels.user import User
from .Providers.analysis import Analysis

import uuid



# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
@csrf_exempt
def user(request):
    #register user
    if request.method == 'POST':
        json_data = json.loads(request.body)
        
        user_id = str(uuid.uuid4())
        doc_ref = db.collection(u'user').document()
        analysis = Analysis( description=json_data['description']  )
        analysis_results = analysis.results()
        conflict = Conflict(type=analysis_results['potential_causes'],description=json_data['description'] ,
        suicidal=analysis_results['is_suicide'])
        conflict_resources = {}
        for key, value in analysis_results['potential_causes'].items:

            conflict_resources.add(db.collection(f"{value}"))
        
        # doc_ref.set(User(json_data['name'], user_id, json_data['location'], conflict.to_dict()).to_dict())
        return JsonResponse({'name':json_data['name'], 'analysis_results':analysis_results})